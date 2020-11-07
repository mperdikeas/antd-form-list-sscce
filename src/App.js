// https://stackoverflow.com/q/64729356/274677
// https://github.com/ant-design/ant-design/issues/27629

import React from 'react';
import { Form, Input, Button } from "antd";

class App extends React.Component {

    constructor(props) {
        super(props);
        // COMMENT #1: one row is enough to showcase the problem
        /* COMMENT #2: I include the `{name: 'foo', value: 'bar'}` and the "c: 'gamma'" values
         *             to demostrate that fields that aren't rendered in the DOM are NOT reported 
         *             in the `allValues` parameter of `onValuesChange` if and only if they are
         *             not inside a Form.List. Why do we see this discrepancy? Is it a BUG or 
         *             an intended feature? (and if the latter, why is it useful?)
         */
        this.state = {useA: true,
                      fields: [{name: 'foo', value: 'bar'}, {name: 'list', value: [{a: '', b: '', c: 'gamma'}]}]};
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
    
