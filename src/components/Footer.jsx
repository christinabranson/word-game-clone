import React from "react";

const Footer = () => (
  <div class="ui inverted vertical footer segment">
    <div class="ui center aligned container">
      <div class="ui center aligned stackable inverted divided grid">
        <div class="seven wide column">
          <h4 class="ui inverted header">Word Game Clone</h4>
          <p>
            This is an open-source project that mimicks a popular word game.
          </p>
        </div>
      </div>
      <div class="ui inverted section divider"></div>
      <div class="ui horizontal inverted small divided link list">
        <a
          href="https://github.com/christinabranson/word-game-clone"
          target="_blank"
          className="item"
        >
          See on GitHub
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
