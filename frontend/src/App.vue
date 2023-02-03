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
            />
          </v-col>
          <v-col :cols="3">
            <List 
              title="Movies" 
              :items="categories.movies" 
              has-author 
              @create="item => create(item, 'movies')" 
              @update="item => update(item, 'movies')" 
            />
          </v-col>
          <v-col :cols="3">
            <List 
              title="Games" 
              :items="categories.games" 
              @create="item => create(item, 'games')" 
              @update="item => update(item, 'games')" 
            />
          </v-col>
          <v-col :cols="3">
            <List 
              title="Music" 
              :items="categories.music" 
              has-author 
              @create="item => create(item, 'music')" 
              @update="item => update(item, 'music')" />
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
    games: [],
    music: []
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

</script>
