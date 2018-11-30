// import React, { Component } from 'react'
// import axios from 'axios';
// import Token from '../Auth/token';
// import { NavLink, Route } from "react-router-dom";
// import Category from '../Quiz_Landing/Quiz_landing';
// import Loading from '../Styles/Loading';
// import NewMaterial from './NewMaterial';
// import MaterialByCategory from './MaterialByCategory';
// export default class Material extends Component {
//     constructor(props) {
//         super(props);
//         this.get = this.get.bind(this);
//         this.openCategory = this.openCategory.bind(this);
//         this.state = {
//             materials: [],
//             category: '',
//         }
        
//     }
//     componentDidMount() {
//         this.get();
//     }
//     openCategory(category) {
//         // if(category.includes(' ')) {
//         //     console.log(category);
//         // }
//         // if(category.includes('#')) {
//         //     console.log(category);
//         // }
//         window.location = `/material/${category.toLowerCase()}`;
//     }
//     get() {
//             // console.log(this.state);
//         axios.get(`http://localhost:4000/materials/`,{headers: {authorization: Token}}).then( res => {
//             this.setState({materials :res.data})
//             console.log(this.state.materials);
//         });
//     }
//     render() {
//         // if(!this.state.materials.length) return <Loading />
//         const material = this.state.materials;
//         const self = this;
//         return (
//         <div className="container">
//             <div className="all-material">
//             <h1>All Material</h1>
//                 <Route path="/newmaterial/" exact component={NewMaterial} />
//                 <NavLink to="/newmaterial" exact>
//                     <span className="glyphicon glyphicon-plus" />
//                 </NavLink>
//                 {Object.keys(material).map(function(key) {
//                     return(
//                         <div className="collection">
//                             <div className="items">
//                                 <div className="subject-box">
//                                     {material[key].subject_name} <br />
//                                 </div>
                                
//                                 <div className='category-container' ref="cat" >
//                                     {material[key].category_name.map(m => (
//                                         <div>
//                                             <div className="category-box" onClick={() => { self.openCategory(m)}}>
//                                                 <div>{m}</div>
//                                             </div>
//                                             </div>
//                                         ))}
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//         )
//     }
// }
import React, { Component } from 'react'
import axios from 'axios';
import Token from '../Auth/token';
import { NavLink, Route } from "react-router-dom";
import Category from '../Quiz_Landing/Quiz_landing';
import Loading from '../Styles/Loading';
import NewMaterial from './NewMaterial';
import MaterialByCategory from './MaterialByCategory';
import AllMaterial from './AllMaterial';

export default class Material extends Component {
    constructor(props) {
        super(props);
        this.getURL = this.getURL.bind(this);
        this.getData = this.getData.bind(this);
        this.state = {
            materialName: '',
            materialData: [],
        }
        
    }
    getURL() {
        const params  = this.props.match.params.category;
        this.setState({ materialName: params === undefined ? 'ALL': params })
    }
    componentWillMount() {
        this.getURL();
    }
    componentDidMount() {
        console.log('asdasd');
        this.getData();
    }
    componentWillUpdate() {
        // window.location.reload();
    }
    getData() {
        const   MATERIAL_URL = this.state.materialName === 'ALL' ? 
                            'http://localhost:4000/materials/' :
                            `http://localhost:4000/materials/${this.state.materialName}`,
                HEADERS = {headers: {authorization: Token}};

        axios.get(MATERIAL_URL, HEADERS ).then(res => {
            this.setState({materialData: res.data});
        });

    }
  render() {
    
    if(this.state.materialName !== 'ALL') return <MaterialByCategory data={this.state.materialData}/>

    return <AllMaterial data={this.state.materialData}/>
  }
}
