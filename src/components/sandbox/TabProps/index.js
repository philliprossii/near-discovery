import Editor from '@monaco-editor/react';
import React, { useCallback } from 'react';

import { Tab } from '../utils/const';
import { recordHandledError } from '@/utils/analytics';

const TabProps = ({ tab, widgetProps, setWidgetProps, propsError }) => {
  const reformatProps = useCallback(
    (props) => {
      try {
        const formattedProps = JSON.stringify(JSON.parse(props), null, 2);
        setWidgetProps(formattedProps);
      } catch (e) {
        console.log(e);
        recordHandledError({ scope: 'sandbox reformatProps', message: e.message || e });
      }
    },
    [setWidgetProps],
  );

  return (
    <div className={`${tab === Tab.Props ? '' : 'visually-hidden'}`}>
      <div className="form-control" style={{ height: '70vh' }}>
        <Editor
          value={widgetProps}
          defaultLanguage="json"
          onChange={(props) => setWidgetProps(props)}
          wrapperProps={{
            onBlur: () => reformatProps(widgetProps),
          }}
        />
      </div>
      <div className=" mb-3">^^ Props for debugging (in JSON)</div>
      {propsError && <pre className="alert alert-danger">{propsError}</pre>}
    </div>
  );
};

export default TabProps;
