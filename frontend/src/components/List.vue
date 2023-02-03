<script lang="ts" setup>
  import { ref } from 'vue';
  
  export type Item = {
    _id: string
    name: string
    author: string
    completed: boolean
  }
 
  const { items, title, hasAuthor } = defineProps<{
    title: string
    items: Item[]
    hasAuthor?: boolean
  }>()

  const emit = defineEmits(['update', 'create'])

  const picking = ref<boolean>(false)
  const name = ref<string>('')
  const author = ref<string>('')

  const submit = async (e: any) => {
    const { valid } = await e
    if (valid) {
      emit('create', { name: name.value, author: author.value, completed: false })
      picking.value = false
    }
  }
</script>

<template>
  <v-card border="1" class="pa-0" density="compact">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text class="pa-0 pt-2">
      <v-table density="comfortable" hover>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
            @click="item.completed = !item.completed; emit('update', item)"
            :class="item.completed ? 'text-medium-emphasis' : ''"
          >
            <td>
              <v-checkbox v-model="item.completed" hide-details></v-checkbox>
            </td>
            <td class="font-weight-medium">{{ item.name }}</td>
            <td v-if="hasAuthor">{{ item.author }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-form validate-on="submit" @submit.prevent="submit">
        <v-row v-if="picking" no-gutters class="d-flex align-center">
          <v-text-field 
            density="compact" 
            label="Name"
            hide-details class="w-50 py-3 px-2 pl-3" 
            variant="outlined"
            :rules="[v => !!v || 'Field is required']"
            v-model="name"
            required
          >
          </v-text-field>
          <v-text-field
            v-if="hasAuthor"
            v-model="author" 
            density="compact" 
            label="Author" 
            hide-details 
            class="py-3" 
            variant="outlined"
          >
          </v-text-field>
          <v-btn variant="plain" size="small" icon="mdi-close" @click="picking = false">
          </v-btn>
        </v-row>
        <v-btn v-if="!picking" block class="py-2" @click="picking = true">
          <v-icon icon="mdi-plus"></v-icon>
        </v-btn>
        <v-btn v-else block type="submit" class="py-2">
          <v-icon icon="mdi-check"></v-icon>
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template> 
