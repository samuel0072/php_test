const app = Vue.createApp({
    data: function() {
        return {
            show_users: true,//controla se deve exibir a lista de usuarios
            show_repos: true,//controle se deve exibir a lista de repositorios do usuario
            search_term: "",//termo da busca
            len_result:0,//quantidade de usuários encontrados na busca,
            found_users:[],
            usr_repos:[],
            usr: null,
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
            self.fetchUsers();//utiliza o metodo fetchUsers para buscar os usuários
        }
    },

    methods: {
        fetchUsers: function() {
            var self = this;
            var url = "search.php?q={0}".replace("{0}", self.search_term);
            
            var xhr = new XMLHttpRequest();

            xhr.open("GET", url);

            xhr.onload = function() {
                console.log(xhr.responseText);
                response = JSON.parse(xhr.responseText);
                self.found_users = response.items;
                self.show_users = true;
                self.show_repos = false,
                self.usr = null;
                self.len_result = response.total_count;
            };
            xhr.setRequestHeader("Accept", "application/json");

            xhr.send();
        },
        fetchUsrRepos: function(usr) {
            var self = this;
            var url = "search_user_repos.php?user={0}".replace("{0}", usr.username);
            
            var xhr = new XMLHttpRequest();

            xhr.open("GET", url);

            xhr.onload = function() {
                console.log(xhr.responseText);
                self.usr_repos = JSON.parse(xhr.responseText);
                self.show_users = false;
                self.show_repos = true,
                self.usr = usr;

            };
            xhr.setRequestHeader("Accept", "application/json");

            xhr.send();
        },
    },

});
app.mount("#main")