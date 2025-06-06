import { differenceInDays, format } from 'date-fns';
import { Tag } from 'antd';

export const ExpiresInfo = ({ expiresAt }: { expiresAt: any }) => {
  if (!expiresAt) return null;

  const date = expiresAt.toDate();
  const daysLeft = differenceInDays(date, new Date());

  let color = 'green';
  if (daysLeft <= 7) color = 'orange';
  if (daysLeft <= 3) color = 'red';

  return (
    <Tag color={color}>
      Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''} (
      {format(date, 'dd MMM yyyy')})
    </Tag>
  );
};
