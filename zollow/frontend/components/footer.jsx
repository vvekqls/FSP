import React from 'react';

export default () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <img className='eho-image' src={window.imageEHO}></img>
        <span className='footer-copy'>CasaMare&nbsp;&copy;2018</span>
        <span className='footer-text'>Follow me
          <a href='https://github.com/The-Speck'>
            <img src={window.gitLogo}>
            </img>
          </a>
        </span>
      </div>
    </footer>
  );
};

{/* <li><a href="https://www.linkedin.com/in/david-dabin-song-aa70b317a/" target="_blank" rel="noopener noreferrer" class="icon brands alt fa-linkedin"><span class="label">linkedin</span></a></li>
  <li><a href="https://github.com/vvekqls" target="_blank" rel="noopener noreferrer" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>
  <li><a href="mailto:d3song@ucsd.edu" class="icon fa-envelope"><span class="label">Email</span></a></li> */}
