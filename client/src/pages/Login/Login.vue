<template>
    <div class="login-page">
        <b-container>
            <h5 class="logo">
                <i class="fa fa-circle text-gray" />
                Garage
                <i class="fa fa-circle text-warning" />
            </h5>
            <Widget class="mx-auto" title="<h3 class='mt-0'>Login to Garage</h3>" customHeader>
                <form class="mt" @submit.prevent="loginUser">
                    <div class="form-group">
                        <input class="form-control no-border" v-validate="'required|email'" v-model="user.email" required type="email" name="email" placeholder="Email" />
                        <b-alert class="alert-sm" variant="danger" :show="errors.has('email')">
                            {{ errors.first('email') }}
                        </b-alert>

                    </div>
                    <div class="form-group">
                        <input class="form-control no-border" v-validate="'required|min:6|max:32'" v-model="user.password" required type="password" name="password" placeholder="Password" ref="password"/>
                        <b-alert class="alert-sm" variant="danger" :show="errors.has('password')">
                            {{ errors.first('password') }}
                        </b-alert>

                    </div>
                    <div class="clearfix">
                        <div class="btn-toolbar float-right">
                            <b-button type="submit" size="sm" variant="inverse"  :disabled="errors.any() || isCompleted">Login</b-button>
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
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'LoginPage',
        components: { Widget },
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                }
            };
        },
        computed:{
            isCompleted() {
                return Object.values(this.user).map(value => value ? value : false).includes(false)
            },
            ...mapGetters('user',['getLoggedInStatus'])
        },
        methods: {
            ...mapActions('user',[
                'login'
            ]),
            loginUser() {
                this.login(this.user).then(() => {
                    if (this.getLoggedInStatus) {
                        this.$router.push({
                            path:'app'
                        })
                    }
                })
            },
        },
    };
</script>

<style src="@/assets/form.scss" lang="scss" scoped />
