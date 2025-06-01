import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false, trickleSpeed: 100 });

export const startProgress = () => nprogress.start();
export const stopProgress = () => nprogress.done();
