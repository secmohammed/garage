<template>
    <b-navbar class="header d-print-none">
        <b-nav>
            <b-nav-item>
                <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
                    <i class='la la-bars la-lg' />
                </a>
                <b-tooltip target="barsTooltip" placement="bottom">
                    Turn on/off <br> sidebar <br> collapsing
                </b-tooltip>
                <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
                    <span class="rounded rounded-lg bg-gray text-white d-md-none">
                        <i class="la la-bars la-lg" />
                    </span>
                    <i class="la la-bars la-lg d-sm-down-none ml-4" />
                </a>
            </b-nav-item>
        </b-nav>
        <a class="navbarBrand d-md-none">
            <i class="fa fa-circle text-gray mr-n-sm" />
            <i class="fa fa-circle text-warning" />
            &nbsp;
            Garage
            &nbsp;
            <i class="fa fa-circle text-warning mr-n-sm" />
            <i class="fa fa-circle text-gray" />
        </a>
        <b-nav class="ml-auto">
            <b-nav-item-dropdown class="settingsDropdown d-sm-down-none" no-caret right>
                <template slot="button-content">
                    <i class="la la-cog px-2" />
                </template>
                <b-dropdown-item><i class="la la-user" /> My Account</b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item-button @click="logout">
                    <i class="la la-sign-out" /> Log Out
                </b-dropdown-item-button>
            </b-nav-item-dropdown>
        </b-nav>
    </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Header',
    computed: {
        ...mapState('layout', {
            sidebarClose: state => state.sidebarClose,
            sidebarStatic: state => state.sidebarStatic,
        }),
    },
    methods: {
        ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive']),
        switchSidebarMethod() {
            if (!this.sidebarClose) {
                this.switchSidebar(true);
                this.changeSidebarActive(null);
            } else {
                this.switchSidebar(false);
                const paths = this.$route.fullPath.split('/');
                paths.pop();
                this.changeSidebarActive(paths.join('/'));
            }
        },
        toggleSidebarMethod() {
            if (this.sidebarStatic) {
                this.toggleSidebar();
                this.changeSidebarActive(null);
            } else {
                this.toggleSidebar();
                const paths = this.$route.fullPath.split('/');
                paths.pop();
                this.changeSidebarActive(paths.join('/'));
            }
        },
        ...mapActions('user', {
            logoutUsingStore: 'logout'
        }),
        logout() {
            this.logoutUsingStore().then(() => {
                this.$router.push({
                    path: '/login'
                })
            })
        }
    },
};
</script>

<style src="./Header.scss" lang="scss" scoped />
