<div class="m__home">
  <h1>{{hello}}</h1>
  <p>You now have:</p>
  <ul>
    <li v-repeat="items" v-html="$value" />
  </ul>
  <div class="navigation">
    <button name="navigation" value="Contact" v-on="click: testNavigation">Contact</button>
  </div>

</div>
