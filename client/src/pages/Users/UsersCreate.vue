<template>
    <div class="tables-basic">
        <b-breadcrumb>
            <b-breadcrumb-item>{{ $route.name }}</b-breadcrumb-item>
        </b-breadcrumb>
        <h2 class="page-title">Create Users</h2>

        <b-row>
            <b-col>
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
                        <label for="">Select a type.</label>
                        <select class="form-control no-border" name="in_field" v-model="user.type" v-validate="'required|included:user,admin,driver'" data-vv-as="selected">
                            <option disabled>Select a type</option>
                            <option value="user"> user</option>
                            <option value="admin">admin</option>
                            <option value="driver">driver</option>
                        </select>

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
            </b-col>
        </b-row>
    </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "CreateUsers",
    data() {
        return {
            user: {
                email: '',
                password: '',
                password_confirmation: '',
                phoneNumber: '',
                username: '',
                type: ''
            },
        };
    },
    computed:{
        isCompleted() {
            return Object.values(this.user).map(value => value ? value : false).includes(false)
        },

    },
    methods: {
        ...mapActions('user',['register']),
        signup() {
            let user = _.omit(this.user,['password_confirmation'])
            this.register(user).then((res) => {
                toast.info('High Five !, User has been created.')
            })
        },
    }
};
</script>
