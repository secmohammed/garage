<template>
    <div class="login-page">
        <b-container>
            <h5 class="logo">
                <i class="fa fa-circle text-gray" />
                Garage
                <i class="fa fa-circle text-warning" />
            </h5>
            <Widget class="mx-auto" title="<h3 class='mt-0'>Register to Garage</h3>" customHeader>
                <form class="mt" @submit.prevent="signup">
                    <div class="form-group">
                        <input class="form-control no-border"  v-validate="'required|email'" v-model="user.email" required type="text" name="email" placeholder="Email" />
                        <b-alert class="alert-sm" variant="danger" :show="errors.has('email')">
                            {{ errors.first('email') }}
                        </b-alert>

                    </div>
                    <div class="form-group">
                        <input class="form-control no-border" v-validate="'required|min:8|max:32'" v-model="user.username" required type="text" name="username" placeholder="pick up a fancy username" />
                        <b-alert class="alert-sm" variant="danger" :show="errors.has('username')">
                            {{ errors.first('username') }}
                        </b-alert>

                    </div>

                    <div class="form-group">
                        <input class="form-control no-border" v-validate="{ required: true, regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im }" v-model="user.phoneNumber" required type="text" name="phoneNumber" placeholder="phoneNumber" />
                        <b-alert class="alert-sm" variant="danger" :show="errors.has('phoneNumber')">
                            {{ errors.first('phoneNumber') }}
                        </b-alert>

                    </div>
                    <div class="form-group">
                        <input class="form-control no-border" v-model="user.password" required type="password" name="password" placeholder="Password" ref="password"/>
                        <b-alert class="alert-sm" variant="danger" :show="errors.has('password')">
                            {{ errors.first('password') }}
                        </b-alert>

                    </div>
                    <div class="form-group">
                        <input class="form-control no-border" v-validate="'required|confirmed:password'" v-model="user.password_confirmation" required type="password" name="password" placeholder="Password Confirmation" />
                    </div>
                    <div class="clearfix">
                        <div class="btn-toolbar float-right">
                            <b-button type="submit" size="sm" variant="inverse"  :disabled="errors.any() || isCompleted">Register</b-button>
                        </div>
                    </div>
                </form>
            </Widget>
        </b-container>
        <footer class="footer">
            2018 &copy; Garage.
        </footer>
    </div>
</template>

<script>
    import Widget from '@/components/Widget/Widget';
    import axios from 'axios'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'RegisterPage',
        components: { Widget },
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    password_confirmation: '',
                    phoneNumber: '',
                    username: ''
                }
            };
        },
        computed:{
            isCompleted() {
                return Object.values(this.user).map(value => value ? value : false).includes(false)
            },

        },
        methods: {
            ...mapActions('user',[
                'register'
            ]),
            signup() {
                let user = _.omit(this.user,['password_confirmation'])
                user.type = 'user'
                this.register(user).then((res) => {
                    toast.info('Thanks For registering, ' + res.data.username)
                    this.$router.push({
                        path:'/login'
                    });
                })
            },
        },
    };
</script>

<style src="@/assets/form.scss" lang="scss" scoped />
