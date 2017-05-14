import 'file-loader?name=./dist/index.html!./index.html'

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log("service worker registered");
    });
}
