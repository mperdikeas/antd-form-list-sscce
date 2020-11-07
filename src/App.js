import React from 'react';
import { Form, Input, Button } from "antd";

class App extends React.Component {

    constructor(props) {
        super(props);
        // COMMENT #1: one row is enough to showcase the problem
        /* COMMENT #2: I include the `{name: 'foo', value: 'bar'}` only to demostrate that fields that aren't
         *             rendered in the DOM are not reported in the `allValues` parameter of `onValuesChange`
         */
        this.state = {useA: true,
                      fields: [{name: 'foo', value: 'bar'}, {name: 'list', value: [{a: 'alpha', b: 'beta'}]}]};        
    }

    onValuesChange = (changedValues, allValues) => {
        console.log(allValues);

        const newFields = [{name: 'list',
                            value: allValues.list}];

        this.setState(newFields);
    }

    render() {
        const self = this;

        return (
          <Form
            fields = {this.state.fields}
            onValuesChange = {this.onValuesChange}
                >
                <Form.List name='list'>
                {
                    (fields, { add, remove }) => {
                        return (
                            <>
                            {fields.map((field, field_index) => {
                                return (
                                        <>
                                        <Button
                                          onClick={() => {self.setState({useA: !this.state.useA})}}
                                        >Use {self.state.useA?'B':'A'}</Button>
                                        {
                                            self.state.useA?(
                                               <Form.Item
                                                   name={[String(field_index), 'a']}
                                               >
                                                   <Input addonBefore={'a'}/>
                                             </Form.Item>):(
                                             <Form.Item
                                                     name={[String(field_index), 'b']}
                                             >
                                                   <Input addonBefore={'b'}/>
                                            </Form.Item>
                                             )
                                        }
                                    </>
                                );
                            })

                            }
                            </>
                        );
                    }
                }
            </Form.List>
          </Form>
        );

    }
}


export default App;

