import React from "react";
import { Label, Table, Pagination, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DisplayDate from "../DisplayDate";
import { FormattedMessage } from "react-intl";
import { colors } from "../../utils/constants";
import { RESTAURANT_SUBPROD_PATH_WITH_PARAMS } from "../../utils/static_constants";

function ProductList({ data, take, total, activePage, onPageChange }) {
  return (
    <div>
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <FormattedMessage id="name" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id="category" />
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
                  <Label>{d.category.name}</Label>
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

                <Table.Cell
                  style={{ fontSize: 10 }}
                  //   as={Link}
                  //   to={`${RESTAURANT_SUBPROD_PATH_WITH_PARAMS}${d.id}`}
                >
                  <Button
                    icon="eye"
                    style={{ fontSize: 10, color: colors.VIOLET }}
                    size="small"
                  />
                  <Icon />
                </Table.Cell>
                <Table.Cell style={{ fontSize: 10 }}>
                  <Button
                    icon="pencil alternate"
                    style={{ fontSize: 10, color: colors.VIOLET }}
                    size="small"
                  />
                  <Icon />
                </Table.Cell>

                <Table.Cell style={{ fontSize: 10 }}>
                  <Button
                    icon="delete"
                    style={{ fontSize: 10, color: colors.RED }}
                    size="small"
                  />
                  <Icon />
                </Table.Cell>
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
    </div>
  );
}

export default ProductList;
