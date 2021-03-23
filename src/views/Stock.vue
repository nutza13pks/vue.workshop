<template>
  <v-container>
    <!-- Summary Section -->
    <v-row>
      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="TOTAL"
          avatar_ic="mdi-cart"
          avatar_bg="#00a65a"
          subtitle="1800"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="SOLD-OUT"
          avatar_ic="mdi-flask-empty-outline"
          avatar_bg="#f39c12"
          subtitle="12"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="RETURN"
          avatar_ic="mdi-keyboard-return"
          avatar_bg="#dd4b39"
          subtitle="2"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="DISCOUNT"
          avatar_ic="mdi-gift-outline"
          avatar_bg="#00c0ef"
          subtitle="101"
        />
      </v-col>
    </v-row>

    <!-- Table Section -->
    <v-card>
      <!-- <v-data-table
      :headers="[
      {text: 'Firstname', value: 'firstname'}, 
      {text: 'Lastname', value: 'lastname'}
      ]"
      :items="[
      {firstname: 'nut', lastname: 'nutthapon'}, 
      {firstname: 'noey', lastname: 'punieka'}
      ]"
    >
    </v-data-table> -->

      <v-data-table :search="search" :headers="headers" :items="mDataArray">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Stock</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              @click="$router.push('/stock-create')"
              color="primary"
              dark
              class="mb-2"
            >
              <v-icon left>add</v-icon>
              <span>New Product</span>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>
              <v-img
                v-bind:src="item.image | imageUrl"
                lazy-src="https://picsum.photos/id/11/10/6"
                aspect-ratio="1"
                max-width="50"
                max-height="50"
              ></v-img>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price | currency("0") }}</td>
            <td>{{ item.stock | number("0, 0") }} pcs.</td>
            <td>
              <v-icon class="mr-2" @click="editItem(item)"> edit </v-icon>
              <span class="ma-1"></span>
              <v-icon @click="deleteItem(item)"> delete </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import StockCard from "@/components/cards/StockCard";
import Axios from "axios";

export default {
  name: "Stock",
  data() {
    return {
      search: "",
      mDataArray: [],
      headers: [
        {
          text: "Id",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Stock", value: "stock" },
        { text: "Action", value: "action" },
      ],
    };
  },
  components: {
    StockCard,
  },
  mounted() {
    console.log("Stock components is running..");
    Axios.get("http://localhost:8081/api/v2/product").then((result) => {
      console.log(JSON.stringify(result.data));
      this.mDataArray = result.data;
    });
  },
  methods: {
      editItem(item){
        this.$router.push(`/stock-edit/${item.id}`)
      }
    }
};
</script>

<style></style>
