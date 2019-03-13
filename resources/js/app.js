
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('chat', require('./components/Chat.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
    	input: '',
    	text: {
    		message: [],
    		user: [],
    		color: []
    	}
    },
    methods: {
    	push() {
    		this.text.message.push(this.input)
    		this.text.user.push('Anda')
    		this.text.color.push('red')

    		axios.post('/push', {
    			message: this.input,
    			textsession: this.text
    		}).then(response => {
    			this.input = ''
    		}).catch(function (error) {
			    console.log(error.response);
			});
    	},
    	textsession() {
    		axios.post('/textsession')
    		.then( response => {
    			if (response.data != "") {
    				this.text = response.data
    			}
    		})
    	}
    },
    mounted() {
    	this.textsession()

    	Echo.private('chat')
    	.listen('ChatEvent', (e) => {
    		this.text.message.push(e.message)
    		this.text.user.push(e.user)
    		this.text.color.push('blue')

    		axios.post('/ChatSession', {
    			textsession : this.text
    		})
    	})
    }
});
