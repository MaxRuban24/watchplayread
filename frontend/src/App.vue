<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col :cols="3">
            <List 
              title="Books" 
              :items="categories.books" 
              has-author 
              @create="item => create(item, 'books')" 
              @update="item => update(item, 'books')" 
              @delete="item => del(item, 'books')"
            />
          </v-col>
          <v-col :cols="3">
            <List 
              title="Movies" 
              :items="categories.movies" 
              has-author 
              @create="item => create(item, 'movies')" 
              @update="item => update(item, 'movies')"
              @delete="item => del(item, 'movies')"
            />
          </v-col>
          <v-col :cols="3">
            <List 
              title="Games" 
              :items="categories.games" 
              @create="item => create(item, 'games')" 
              @update="item => update(item, 'games')"
              @delete="item => del(item, 'games')"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import List, { Item } from './components/List.vue'
import { onMounted, reactive } from 'vue';
  
  type Categories = {[key: string]: Item[]}

  const categories: Categories = reactive({
    books: [],
    movies: [],
    games: []
  })

  onMounted(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(
        data => data.map((item: any) => {
          console.log(data)
          categories[item.category].push(item)
        })
      )
  })

  const create = (item: Item, category: string) => fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.assign(item, { category }))
  })
    .then(res => res.json())
    .then(
      data => categories[category].push(data)
    )

  const update = (item: Item, category: string) => fetch(`/api/notes/${item._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.assign(item, { category }))
  })

  const del = (item: Item, category: string) => fetch(`/api/notes/${item._id}`, {
    method: 'DELETE'
  })
  .then(data => {
    categories[category] = categories[category].filter(x => x._id != item._id)
  })

</script>
