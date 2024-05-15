import { Tag } from 'antd';
import type { SelectProps } from 'antd';
import { getColorCodeFromText } from '@/utils/style';

type TagRender = SelectProps['tagRender'];

const TagOptionRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  let color = 'blue';
  if (value) {
    color = getColorCodeFromText(value);
  }

  return (
    <Tag color={color} onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose} style={{ marginInlineEnd: 4 }}>
      {label}
    </Tag>
  );
};

export default TagOptionRender;
