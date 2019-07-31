<template>
 <div class="login-page">
        <b-container>
            <Widget class="mx-auto" title="<h3 class='mt-0'>Create Category</h3>" customHeader>
                <form class="mt" @submit.prevent="create">
                    <div class="form-group">
                        <input class="form-control no-border"  v-validate="'required'" v-model="category.name" required type="text" name="name" placeholder="Category Name" />
                        <b-alert class="alert-sm" variant="danger" :show="errors.has('name')">
                            {{ errors.first('name') }}
                        </b-alert>

                    </div>
                    <div class="clearfix">
                        <div class="btn-toolbar float-right">
                            <b-button type="submit" size="sm" variant="inverse"  :disabled="errors.any()">Create One</b-button>
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
import Widget from "@/components/Widget/Widget";
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Categories",
  components: { Widget },
  data(){
    return {
      category: {
        name: ''
      }
    }
  },
  computed:{
  },
  methods: {
    ...mapActions('category',['store']),
    create(){
      this.store(this.category).then(() => {
        toast.success('High Five !, We created a new category.')
      })
    }
  }
};
</script>

<style src="@/assets/form.scss" lang="scss" scoped />
