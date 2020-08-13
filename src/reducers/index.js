import concatenateReducers from "redux-concatenate-reducers";

import user from "./user-reducer";
import post from "./post-reducer";
import group from "./group-reducer";

const flatReducers = concatenateReducers([group, user, post]);

export default flatReducers;
