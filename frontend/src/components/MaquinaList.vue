<template>
  <div class="overflow-hidden rounded-xl shadow-lg border-2 border-blue-electric bg-table">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gradient-blue">
          <th class="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-black">
            Nome
          </th>
          <th class="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-black">
            Tipo
          </th>
          <th class="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-black">
            Status
          </th>
          <th class="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-black">
            Ações
          </th>
        </tr>
      </thead>
      <tbody class="bg-table-body">
        <tr
          v-for="u in maquina"
          :key="u._id"
          class="border-b border-blue-dark hover:bg-blue-hover transition-colors duration-200"
        >
          <td class="px-8 py-5 text-sm font-medium text-gray-light">
            {{ u.name }}
          </td>
          <td class="px-8 py-5 text-sm text-gray-light">
            {{ u.type }}
          </td>
          <td class="px-8 py-5 text-sm text-gray-light">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-status text-black">
              {{ u.status }}
            </span>
          </td>
          <td class="px-8 py-5">
            <div class="flex items-center gap-3">
              <button
                @click="$emit('edit', u)"
                class="inline-flex items-center justify-center bg-gradient-blue hover:brightness-110 text-black font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                aria-label="Editar máquina"
              >
                Editar
              </button>
              <button
                @click="$emit('remove', u._id)"
                class="inline-flex items-center justify-center bg-gradient-red hover:brightness-110 text-black font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                aria-label="Excluir máquina"
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="maquina.length === 0">
          <td colspan="4" class="px-8 py-12 text-center">
            <div class="flex flex-col items-center justify-center">
              <svg class="w-16 h-16 text-gray-icon mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p class="text-gray-light text-base font-medium">
                Nenhuma máquina cadastrada
              </p>
              <p class="text-gray-secondary text-sm mt-1">
                Adicione uma máquina para começar
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  maquina: { type: Array, default: () => [] }
});
const emit = defineEmits(["edit", "remove"]);
</script>

<style scoped>
/* Paleta SMPPM */
.border-blue-electric {
  border-color: #00A8E8;
}

.bg-table {
  background-color: rgba(13, 27, 42, 0.6);
  backdrop-filter: blur(10px);
}

.bg-gradient-blue {
  background: linear-gradient(135deg, #00A8E8 0%, #5C677D 100%);
}

.bg-table-body {
  background-color: rgba(13, 27, 42, 0.4);
}

.border-blue-dark {
  border-color: rgba(0, 168, 232, 0.2);
}

.hover\:bg-blue-hover:hover {
  background-color: rgba(0, 168, 232, 0.15);
}

.text-gray-light {
  color: #E0E1DD;
}

.bg-status {
  background-color: rgba(0, 168, 232, 0.25);
  border: 1px solid #00A8E8;
}

.bg-gradient-red {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
}

.text-gray-icon {
  color: #5C677D;
}

.text-gray-secondary {
  color: rgba(224, 225, 221, 0.6);
}

.hover\:brightness-110:hover {
  filter: brightness(1.1);
}
</style>