import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";
import AppRouting from "./routings/AppRouting";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <div className="main-container">
          <RouterProvider router={AppRouting} />
        </div>
      </AuthProvider>
    </ReduxProvider>
  );
}

export default App;

//     {/** here we make use of context , that information can use by entire childrens */}
//     <Authenticate.Provider value={{ isLoggedIn: authCtx.isLoggedIn, onLogOut : authCtx.logoutHandler }}>
//       <Forms submitForm={authCtx.loginHandler} />
//       <ProductsDashboard ></ProductsDashboard>
//     </Authenticate.Provider>
