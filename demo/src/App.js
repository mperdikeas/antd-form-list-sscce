import React from 'react';
import { Form, Input, Button } from "antd";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {useA: true};
    }

    onValuesChange(_, allValues) {
        console.log(allValues);
    }

    render() {
        const self = this;
        // one row is enough to showcase the problem
        const fields = [{name: 'list', value: [{a: 'alpha', b: 'beta'}]}];
        return (
                <Form
            fields = {fields}
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
                                        >Use {this.state.useA?'B':'A'}</Button>
                                        {
                                            this.state.useA?(
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

