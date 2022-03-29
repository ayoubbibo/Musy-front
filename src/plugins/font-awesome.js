import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faPlay,
  faTrash,
  faBarsStaggered,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faTornado,
  faReorder,
  faSearch,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
library.add(faBarsStaggered,faTrash,faPlay,faPlusCircle,faSearch, faReorder, faTornado, faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
export { FontAwesomeIcon };
