import './bootstrap';
import { createIcons, icons } from 'lucide';
import "bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery";


window.$ = $;
window.jQuery = $;

document.addEventListener("DOMContentLoaded", ()=>{
    createIcons({icons});
});
