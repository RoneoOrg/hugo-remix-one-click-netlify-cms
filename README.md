# kimix

Kimix Website,  Hugo + Netlify


## Getting started

### how to develop
1. Install Hugo, `brew install hugo`
2. git clone this repo, `git clone https://github.com/OhBonsai/kimix.git`
3. start dev server, `cd kimix && hugo server -D`

### code tree
```
├─assets                // CSS folder.  coding here
├─content               // Data 
│  ├─news
│  └─products
├─data                  // Website Meta Data. Using $site.data in template
├─layouts               // Html folder.  coding here
│  ├─news              
│  ├─partials
│  └─_default
├─resources             // Auto gen. Ignore it
│  └─_gen
│      ├─assets
│      │  └─scss
│      └─images
└─static
    ├─admin
    ├─files
    └─media
```