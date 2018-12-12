export default (e, key) => {
    const element = e.target,
        node = document.getElementById(key),
        hiddenwidth = element.scrollWidth,
        visiblewidth = element.clientWidth,
        howmuchisscrolled = element.scrollLeft;
    setTimeout(() => {
        if (hiddenwidth - howmuchisscrolled === visiblewidth) {
            node.classList.add('left');
            node.classList.remove('right');
            node.classList.remove('both');
        }
        if(howmuchisscrolled === 0) {
            node.classList.add('right');
            node.classList.remove('left');
            node.classList.remove('both');
        }
        if(howmuchisscrolled > 0 && (hiddenwidth - howmuchisscrolled !== visiblewidth))  {
            node.classList.add('both');
            node.classList.remove('left');
            node.classList.remove('right');
        } 
    }, 600);
}