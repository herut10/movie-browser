<template>
  <v-container>
    <v-skeleton-loader type="article" class="mb-8" />
    <v-row>
      <v-col cols="12" lg="4">
        <v-skeleton-loader type="image" />
      </v-col>
      <v-col cols="12" lg="8">
        <v-skeleton-loader type="text" class="mb-4" />
        <v-skeleton-loader type="text" class="mb-4" />
        <v-skeleton-loader type="text" />
      </v-col>
    </v-row>
  </v-container>
</template>
