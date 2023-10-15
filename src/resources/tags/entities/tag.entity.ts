export interface TagProps {
    tag: String
    name: String
    status: number
    source: String
    price: number
}


export class Tag {
    private props: TagProps

    constructor(props: TagProps){
        this.props = props;
    }
    
    /* Getters */
    get data(){
        return this.props;
    }
    
    get tag(){
        return this.props.tag;
    }

    get name(){
        return this.props.name;
    }

    get status(){
        return this.props.status;
    }

    get source(){
        return this.props.source;
    }

    get price(){
        return this.props.price;
    }

    /* Setters */
    set tag(tag: String){
        this.props.tag = tag;
    }

    set name(name: String){
        this.props.name = name;
    }

    set status(status: number){
        this.props.status = status;
    }

    set source(source: String){
        this.props.source = source;
    }

    set price(price: number){
        this.props.price = price;
    }

}