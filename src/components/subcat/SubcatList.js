import React, { useState } from "react";
import { Label, Table, Pagination, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DisplayDate from "../DisplayDate";
import { FormattedMessage } from "react-intl";
import { colors } from "../../utils/constants";
import { RESTAURANT_SUBPROD_PATH_WITH_PARAMS } from "../../utils/static_constants";
import Subprods from "./Subprods";

function SubcatList({ data, take, total, activePage, onPageChange }) {
  const [subcat, setSubcat] = useState({});
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <FormattedMessage id="name" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id="subprod_count" />
            </Table.HeaderCell>

            <Table.HeaderCell>
              <FormattedMessage id="author" />
            </Table.HeaderCell>
            <Table.HeaderCell singleLine>
              <FormattedMessage id="created_at" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id="updated_at" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {data && data.length && (
          <Table.Body>
            {data.map(d => (
              <Table.Row key={d.id}>
                <Table.Cell>
                  <Label>{d.name}</Label>
                </Table.Cell>
                <Table.Cell>
                  <Label>{d.subprod_count}</Label>
                </Table.Cell>

                <Table.Cell>
                  <Label size="tiny">{d.author.name}</Label>
                </Table.Cell>
                <Table.Cell>
                  <Label size="tiny">
                    <DisplayDate date={d.created_at} />
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  <Label size="tiny">
                    <DisplayDate date={d.updated_at} />
                  </Label>
                </Table.Cell>
                <Table.Cell style={{ fontSize: 10 }}>
                  <Button
                    icon="pencil alternate"
                    style={{ fontSize: 10, color: colors.VIOLET }}
                    size="small"
                  />
                </Table.Cell>
                <Table.Cell style={{ fontSize: 10 }}>
                  <Button
                    icon="eye"
                    style={{ fontSize: 10, color: colors.VIOLET }}
                    size="small"
                    onClick={async () => {
                      await setSubcat(d);
                      await setOpen(true);
                    }}
                  />
                </Table.Cell>
                {d.subprod_count === 0 && (
                  <Table.Cell>
                    <Button
                      icon="remove"
                      style={{ fontSize: 10, color: colors.RED }}
                      size="small"
                    />
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
      <Pagination
        defaultActivePage={activePage}
        totalPages={Math.ceil(total / take)}
        onPageChange={async (e, data) => {
          e.preventDefault();
          const { activePage } = data;
          const skipper = (activePage - 1) * take - 1;
          await onPageChange({
            activePage,
            skip: skipper > 0 ? skipper : 0,
            take
          });
        }}
      />

      <Subprods
        subcat={subcat}
        open={open}
        cancel={async () => {
          await setOpen(false);
        }}
      />
    </div>
  );
}

export default SubcatList;
