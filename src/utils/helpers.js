import Showdown from "showdown";

const converter = new Showdown.Converter();

const convertMDtoHTML = (markdown) => {
    return converter.makeHtml(markdown);
}

export default convertMDtoHTML;