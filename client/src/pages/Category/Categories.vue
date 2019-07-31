<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item>{{ $route.name }}</b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">Show All Categories</h2>

    <b-row>
      <b-col>
        <Widget
          title="<h5>Table <span class='fw-semi-bold'>Styles</span></h5>"
          customHeader
          settings
          close
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#</th>
                  <th>name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories" :key="category.id">
                  <td>{{category.id}}</td>
                  <td>{{category.name}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix">
            <div class="float-right">
              <b-button variant="default" class="mr-xs" size="sm">Send to...</b-button>
              <b-dropdown variant="inverse" class="mr-xs" size="sm" text="Clear" right>
                <b-dropdown-item>Clear</b-dropdown-item>
                <b-dropdown-item>Move ...</b-dropdown-item>
                <b-dropdown-item>Something else here</b-dropdown-item>
                <b-dropdown-divider/>
                <b-dropdown-item>Separated link</b-dropdown-item>
              </b-dropdown>
            </div>
            <p>Basic table with styled content</p>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import Widget from "@/components/Widget/Widget";
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Categories",
  components: { Widget },
  mounted(){
    this.index()
  },
  computed:{
    ...mapGetters('category',{
      categories: 'getCategories'
    })
  },
  methods: {
    ...mapActions('category',['index'])
  }
};
</script>
