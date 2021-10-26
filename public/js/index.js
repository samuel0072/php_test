const app = Vue.createApp({
    data: function() {
        return {
            show_users: false,//controla se deve exibir a lista de usuarios
            show_info: false,//controle se deve exibir a lista de repositorios do usuario
            search_term: "",//termo da busca
            len_result:0,//quantidade de usuários encontrados na busca,
            found_users:[],
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
                
                response = JSON.parse(xhr.responseText);
                console.log(response);
                self.found_users = response.items;
                self.show_users = true;
                self.show_info = false;
                self.usr = null;
                self.len_result = response.total_count;
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
                self.usr = JSON.parse(xhr.responseText);
                console.log(self.usr);
                self.show_users = false;
                self.show_info = true;

            };
            xhr.setRequestHeader("Accept", "application/json");

            xhr.send();
        },
    },

});
app.mount("#main")