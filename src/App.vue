<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

html {
	height: 100%;
	scroll-behavior: smooth;
}
body {
    font-family: 'Gill Sans', Helvetica, Arial, sans-serif;
	background: #ddd;
	background: radial-gradient(dimgray, black);
	color: ivory;
	font-size: 100%;
	margin:0;
	padding: 0;
}


/* Styling på scrollbaren */

/*Här kan man ändra bredden på banan*/
body::-webkit-scrollbar {
  width: 0.35rem;
}
/*Här kan man ändra saker om banan*/
body::-webkit-scrollbar-track {
  background: rgb(0, 0, 0);
}
/*Här kan man ändra själva scrollern, asså tåget i banan*/
body::-webkit-scrollbar-thumb {
  background: #ff8177;
  border-radius: 10px;
}

#app {
  height: 100%;
  width: 100%;
}

/*#app>div{
  height: 100%;
  width: 100%;
}*/

body{
  width: 100%;
  height: 100%;
}

</style>
