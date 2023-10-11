export interface TagProps {
    name: String
    status: Number
    source: String
    price: Number
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
    set name(name: String){
        this.props.name = name;
    }

    set status(status: Number){
        this.props.status = status;
    }

    set source(source: String){
        this.props.source = source;
    }

    set price(price: Number){
        this.props.price = price;
    }

}