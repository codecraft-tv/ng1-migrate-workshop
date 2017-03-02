// import {app} from "./app";
import {SearchComponent} from "./components/search.component";
import {PersonListComponent} from "./components/person-list.component";
import {PersonCreateComponent} from "./components/person-create.component";
import {Routes} from "@angular/router";
import {PersonEditComponent} from "./components/person-edit.component";

// app.config(function ($stateProvider, $urlRouterProvider) {
//   $stateProvider
//       .state('list', {
//         url: "/",
//         views: {
//           'main': {
//             template: '<person-list></person-list>',
//           },
//           'search': {
//             template: '<search></search>',
//           }
//         }
//       })
//       .state('edit', {
//         url: "/edit/:email",
//         views: {
//           'main': {
//             template: `<person-edit mode="'Edit'"></person-edit>`
//           }
//         }
//       })
//       .state('create', {
//         url: "/create",
//         views: {
//           'main': {
//             template: `<person-edit mode="'Create'"></person-edit>`
//           }
//         }
//       });
//
//   $urlRouterProvider.otherwise('/');
// });


export const routes: Routes = [
  {path: '', redirectTo: '/list(header:search)', pathMatch: 'full'},
  {path: 'list', component: PersonListComponent},
  {path: 'search', component: SearchComponent, outlet: 'header'},
  {path: 'create', component: PersonCreateComponent},
  {path: 'edit/:email', component: PersonEditComponent},
];