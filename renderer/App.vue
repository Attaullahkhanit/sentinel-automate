<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.documentElement.classList.add('dark')
})
</script>

<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>
