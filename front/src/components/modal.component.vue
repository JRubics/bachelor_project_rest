<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <v-card>
        <v-card-title
          primary-title
        >
          <h2>Result</h2>
        </v-card-title>

        <v-card-text>
          <p v-html="handleNewLine(text)"></p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        text: null,
      };
    },
    methods: {
      handleNewLine(str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
      },
      show(text) {
              this.dialog = true;
              this.text = text;
      },
    },
  };
</script>
