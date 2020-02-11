import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Vue } from 'vue/types/vue';

export default function({
  $axios,
  store,
  app
}: {
  $axios: NuxtAxiosInstance;
  app: Vue;
  store: any;
}) {
  $axios.onError(error => {
    if (error.message && error.response && error.response.status) {
      const code = error.response.status;
      if (code === 401) {
        app.$auth.logout();
        store.dispatch('resetStore');
      }
    } else {
      // eslint-disable-next-line
      console.error(
        'Unexpected error - please contact technical support team including the following details: ',
        error
      );
    }
  });
}
