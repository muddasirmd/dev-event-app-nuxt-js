<template>
    <div class="agenda">
        <h2>Agenda</h2>
        <ul>
            <li v-for="agenda in agendaItems" :key="agenda">
                {{ agenda }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

interface Props {
    agendaItems: string[]
}

const { agendaItems } = defineProps<Props>()

</script>