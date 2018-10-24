import { Link } from 'react-router-dom';

import { DynamicConsumer } from '../../../';

export default class Breadcrumb extends React.PureComponent {
  render() {
    return (
      <div>
        <div>面包屑示例</div>
        <DynamicConsumer>
          {
            ({ matched }) => (
              <ul>
                {matched.map(({ match: { path }, route: { name } }) => (
                  <li key={path}>{name}：{path}</li>
                ))}
              </ul>
            )
          }
        </DynamicConsumer>
      </div>
    );
  }
}
