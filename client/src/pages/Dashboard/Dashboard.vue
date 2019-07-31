<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Dashboard</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Dashboard</h1>
    <b-row>
      <b-col lg="3" sm="6" xs="12" v-if="filteredEmergencies('pending')">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Pending">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>Pending Emergencies</h2>
              <p>
                <h2>{{ filteredEmergencies('pending').length }}</h2>
              </p>
              <i class="la la-users text-info rotate-315"/>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12" v-if="filteredEmergencies('completed')">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Completed">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>Completed Emergencies</h2>
              <p>
                <h2>{{ filteredEmergencies('completed').length }}</h2>
              </p>
              <i class="la la-users text-info rotate-315"/>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12" v-if="filteredEmergencies('inProgress')">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="In Progress">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>In Progress Emergencies</h2>
              <p>
                <h2>{{ filteredEmergencies('inProgress').length }}</h2>
              </p>
              <i class="la la-users text-info rotate-315"/>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12" v-if="filteredEmergencies('expired')">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Expired">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>Expired Emergencies</h2>
              <p>
                <h2>{{ filteredEmergencies('expired').length }}</h2>
              </p>
              <i class="la la-users text-info rotate-315"/>
            </div>
          </Widget>
        </div>
      </b-col>
      <pie-chart :data="loadStats"></pie-chart>

    </b-row>
    <pie-chart :data="userStats"></pie-chart>

  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Dashboard",
  components: { Widget },
  methods: {
    ...mapActions('emergency',['index','userEmergencies']),
  },
  mounted() {
    this.index()
    this.userEmergencies()
  },
  computed: {
    ...mapGetters('emergency',{
      emergencies: 'getEmergencies',
      filteredEmergencies: 'getEmergenciesByStatus',
      userFilteredEmergencies: 'getUserEmergenciesByStatus'
    }),
    userStats() {
      let stats = {}
      if (this.userFilteredEmergencies('expired').length) {
        stats.expired = this.userFilteredEmergencies('expired').length
      }
      if (this.userFilteredEmergencies('inProgress').length) {
        stats.inProgress = this.userFilteredEmergencies('inProgress').length
      }
      if (this.userFilteredEmergencies('completed').length) {
        stats.completed = this.userFilteredEmergencies('completed').length
      }
      if (this.userFilteredEmergencies('pending').length) {
        stats.pending = this.userFilteredEmergencies('pending').length
      }
      return stats

    },
    loadStats() {
      let stats = {}
      if (this.filteredEmergencies('expired').length) {
        stats.expired = this.filteredEmergencies('expired').length
      }
      if (this.filteredEmergencies('inProgress').length) {
        stats.inProgress = this.filteredEmergencies('inProgress').length
      }
      if (this.filteredEmergencies('completed').length) {
        stats.completed = this.filteredEmergencies('completed').length
      }
      if (this.filteredEmergencies('pending').length) {
        stats.pending = this.filteredEmergencies('pending').length
      }
      return stats
    }
  }

};
</script>

<style src="./Dashboard.scss" lang="scss" scoped />
