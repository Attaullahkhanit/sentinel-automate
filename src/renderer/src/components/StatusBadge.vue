<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: 'Idle' | 'Running' | 'Failed'
}>()

const statusType = computed(() => {
  switch (props.status) {
    case 'Running':
      return 'primary'
    case 'Failed':
      return 'danger'
    case 'Idle':
    default:
      return 'info'
  }
})
</script>

<template>
  <el-tag :type="statusType" effect="dark" round class="status-badge">
    {{ status }}
  </el-tag>
</template>

<style scoped>
.status-badge {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
