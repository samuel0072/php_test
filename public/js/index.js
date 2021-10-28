const app = Vue.createApp({
    data: function() {
        return {
            show_users: false,//controla se deve exibir a lista de usuarios
            show_info: false,//controle se deve exibir a lista de repositorios do usuario
            search_term: "",//termo da busca
            len_result:0,//quantidade de usuários encontrados na busca,
            found_users:[],
            usr: null,
            repos: [],
            show_repos : false,
            page:1,
        }
    },

    mounted: function() {
        /**
         * Previne o comportamento padrão do formulário de busca
         */
        var self = this;
        var form = document.getElementById("search_bar");
        form.onsubmit = function(event) {
            event.preventDefault();
            self.fetchUsers(page=1);//utiliza o metodo fetchUsers para buscar os usuários
        }
    },

    methods: {
        fetchUsers: function(page = 1) {

            if(page < 1) {//a api do github só lida com número de página >= 1
                page = 1;
            }

            var self = this;
            var url = "search.php?q={0}&page={1}".replace("{0}", self.search_term)
            .replace("{1}", page);
            
            var xhr = new XMLHttpRequest();

            xhr.open("GET", url);

            xhr.onload = function() {
                console.log(xhr.responseText);
                response = JSON.parse(xhr.responseText);
                if(response.status == 'success') {
                    
                    self.found_users = response.data.items;
                    self.show_users = true;
                    self.show_info = false;
                    self.show_repos = false;
                    self.usr = null;
                    self.len_result = response.data.total_count;
                    self.page=page;
                }
                
            };
            xhr.setRequestHeader("Accept", "application/json");

            xhr.send();
        },
        fetchUsrInfos: function(usr) {
            var self = this;
            var url = "getResource.php?resrc_url={0}".replace("{0}", usr.url);
            
            var xhr = new XMLHttpRequest();

            xhr.open("GET", url);

            xhr.onload = function() {
                console.log(xhr.responseText);
                response = JSON.parse(xhr.responseText);
                if(response.status == 'success') {
                    self.usr = response.data;
                    self.show_users = false;
                    self.show_info = true;
                    self.fetchUsrRepos(self.usr);
                }
            };
            xhr.setRequestHeader("Accept", "application/json");

            xhr.send();
        },
        fetchUsrRepos: function(usr) {
            var self = this;
            var url = "getResource.php?resrc_url={0}".replace("{0}", usr.repos_url);
            
            var xhr = new XMLHttpRequest();

            xhr.open("GET", url);

            xhr.onload = function() {
                response = JSON.parse(xhr.responseText);
                if(response.status == 'success') {
                    self.repos = response.data;
                    console.log(self.repos);
                    self.show_users = false;
                    self.show_info = true;
                    self.show_repos = true;
                }
            };
            xhr.setRequestHeader("Accept", "application/json");

            xhr.send();
        },
        formatDate: function(v) {
            return v.replace(/T|Z/g, " ");
        },
    },

});
app.mount("#main")