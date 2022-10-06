import {
  Button,
  Card,
  FormLayout,
  Layout,
  Select,
  SkeletonBodyText,
  TextField,
} from "@shopify/polaris";
import React, {useEffect, useState } from "react";

const FetchApi = () => {
  const [loader, setLoader] = useState(false);
  const [arrData, setArrData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [childrenStatus, setchildrenStatus] = useState(true);
  const [AttributeOptions, setAttributeOptions] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [boxArray, setBoxArray] = useState([]);
  const [state, setState] = useState({
    target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    selected: [],
    user_id: "63329d7f0451c074aa0e15a8",
    target: {
      marketplace: "amazon",
      shopId: "530",
    },
  });

  const [payload, setPayload] = useState({
    data: {
      barcode_exemption: false,
      browser_node_id: "1380072031",
      category: "major_appliances",
      sub_category: "microwaveoven",
    },
    source: {
      marketplace: "shopify",
      shopId: "500",
    },
    target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    user_id: "63329d7f0451c074aa0e15a8",
    target: {
      marketplace: "amazon",
      shopId: "530",
    },
  });

  let url = new URL(
    " https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/"
  );
  const fetchData = async () => {
    setLoader(true);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        appTag: "amazon_sales_channel",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw`,
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 530,
        "Ced-Target-Name": "amazon",
      },
      body: JSON.stringify(state),
    });
    let result = await response.json();
    let temp = [...arrData];
    temp.push(result.data);
    setArrData(temp);
    setLoader(false);
  };

  useEffect(() => {
    fetchData();
  }, [selected]);

  const handleSelectChange = (value, index) => {
    arrData[index].map((k) => {
      if (value === k.name && k.hasChildren === true) {
        let temp = { ...state };
        temp.selected = k.parent_id;
        setState(temp);

        temp = [...selected];
        temp[index] = String(value);
        setSelected(temp);
      }
      if (value === k.name && k.hasChildren === false) {
        k.hasChildren === false ? setchildrenStatus(false) : <></>;
      }
    });
  };
  let options = [];
  arrData.map((items, i) => {
    return (options[i] = items.map(myFunction));
  });

  function myFunction(item) {
    return {
      label: item.name,
      value: item.name,
      p_id: String(item.parent_id),
    };
  }

  const [selectedAttribute, setselectedAttribute] = useState();

  const fetchAddAttributesData = async () => {
    let response = await fetch(
      "https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        },
        body: JSON.stringify(payload),
      }
    );
    let result = await response.json();

    var arr = [];
    for (const [key, value] of Object.entries(result.data)) {
      for (var [k, v] of Object.entries(value)) {
        for (var [k1, v1] of Object.entries(v)) {
          if (k1 === "label") {
            arr.push({ label: v1, value: v1, disabled: false });
          }
        }
      }
    }
    setAttributeOptions(arr);
  };

  useEffect(() => {
    fetchAddAttributesData();
  }, []);

  const AddAttribute = () => {
    setBoxArray([...boxArray, 1]);
  };

  const handleSelectAttributeChange = (value, index) => {
    AttributeOptions.map((k) => {
      if (k.value === value) {
        k.disabled = true;
        let temp = [...selected2];
        temp[index] = value;
        setSelected2(temp);
      }
    });
    setselectedAttribute(value);
  };

  const Remove = (index) => {
    let temp = [...boxArray];
    temp.splice(index, 1);
    setBoxArray(temp);
    let temp2 = [...selected2];
    AttributeOptions.map((k, i) => {
      if (k.value === temp2[index]) {
        k.disabled = false;
        let temp3 = [...AttributeOptions];
        temp3[i] = k;
        setAttributeOptions(temp3);
      }
    });
    temp2.splice(index, 1);
    setSelected2(temp2);
  };
  return (
    <div style={{ width: "80vw", marginTop: "50px" }}>
      <Card>
        <Card>
          {loader ? (
            // <SkeletonPage>

            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
          ) : (
            // </SkeletonPage>
            ""
          )}

          {options.map((option, index) => (
            <Select
              placeholder="---select---"
              label=""
              options={option}
              onChange={(e) => handleSelectChange(e, index)}
              value={selected[index]}
            />
          ))}
        </Card>
        {!childrenStatus ? (
          <>
            <Layout>
              <Layout.Section oneThird>
                <div style={{ marginTop: "var(--p-space-5)" }}>
                  {boxArray.map((item, index) => (
                    <Card sectioned>
                      <FormLayout>
                        <Select
                          placeholder="---select---"
                          label="Select Attribute"
                          options={AttributeOptions}
                          onChange={(e) =>
                            handleSelectAttributeChange(e, index)
                          }
                          value={selected2[index]}
                        ></Select>
                        <TextField
                          type="email"
                          label=""
                          onChange={() => {}}
                          autoComplete="email"
                        />
                        <Button primary onClick={(e) => Remove(index)}>
                          Delete
                        </Button>
                      </FormLayout>
                    </Card>
                  ))}
                </div>
              </Layout.Section>
            </Layout>
            <Card title="OPTIONAL ATTRIBUTE" sectioned>
              <Button primary onClick={AddAttribute}>
                Add Attribute
              </Button>
            </Card>
          </>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

export default FetchApi;
