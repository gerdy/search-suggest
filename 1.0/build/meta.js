/*
combined files : 

gallery/search-suggest/1.0/meta

*/
KISSY.config("modules",{
    'gallery/search-suggest/1.0/index': {requires: ['node', 'rich-base','dom','combobox']},
    'gallery/search-suggest/1.0/plugin/history': {requires: ["base","event","./local-query"]},
    'gallery/search-suggest/1.0/plugin/telephone': {requires: ['base','./storage']},
    'gallery/search-suggest/1.0/plugin/tab': {requires: ["base","dom","event","combobox"]},
    'gallery/search-suggest/1.0/plugin/local-query': {requires: ["base","./storage"]},
    'gallery/search-suggest/1.0/plugin/storage': {requires: ['base']},
    'gallery/search-suggest/1.0/plugin/tips-notice': {requires: ["base","dom","event","cookie"]}
});
