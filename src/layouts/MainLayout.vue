<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon :name="Youtube" color="yellow" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold text-indigo-7">
            Meu Plano
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap" round>
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Pesquisar"
            class="bg-white col"
          />
          <q-btn
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            icon="search"
            unelevated
          />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="46px">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4E03AQHCu7LCPmFacw/profile-displayphoto-shrink_200_200/0/1610237472515?e=1617235200&v=beta&t=7oYF05WOtQNMlr_RYwhZQ3rRltWSfzuRalE5YBLklf4"
              />
            </q-avatar>
            <q-tooltip>Conta</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-indigo-10"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label
            header
            class="text-weight-bold text-white text-uppercase"
          >
            Menu
          </q-item-label>

          <q-item
            v-for="link in links1"
            class="text-grey"
            :key="link.text"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item
            v-for="link in links2"
            class="text-grey"
            :key="link.text"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase">
            Em Construção!
          </q-item-label>

          <q-separator class="q-my-md" />

          <q-separator class="q-mt-md q-mb-lg" />

          <div class="q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons1"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons2"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { fabYoutube } from '@quasar/extras/fontawesome-v5';
export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: false,
      search: '',
      links1: [
        { icon: 'dashboard', text: 'Dashboards' },
        { icon: 'apps', text: 'Apps' },
        { icon: 'article', text: 'Pages' },
        { icon: 'horizontal_split', text: 'Layout' }
      ],
      links2: [
        { icon: 'mouse', text: 'Buttons' },
        { icon: 'notifications', text: 'Alerts' },
        { icon: 'person', text: 'Avatars' },
        { icon: 'aspect_ratio', text: 'Modals' },
        { icon: 'pie_chart', text: 'Charts' },
        { icon: 'brush', text: 'Icons' },
        { icon: 'text_format', text: 'Forms' },
        { icon: 'tune', text: 'Range Sliders' },
        { icon: 'calendar_today', text: 'Time & Date' },
        { icon: 'table_view', text: 'Tables' },
        { icon: 'tab', text: 'Tabs' },
        { icon: 'update', text: 'Loaders' },
        { icon: 'control_point', text: 'Drag & Drop' },
        { icon: 'last_page', text: 'Pagination' },
        { icon: 'place', text: 'Vector Maps' }
      ]
    };
  },
  created() {
    this.fabYoutube = fabYoutube;
  }
};
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
