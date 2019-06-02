import React, { Component } from 'react';

export class ViewUser extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {
        userId: -1,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: {
          roleId: -1,
          role: ''
        }
      }
    }
  }

  render() {
    return (
      <div>
        Text
      </div>
    )
  }
}