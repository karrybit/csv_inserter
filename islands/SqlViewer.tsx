/** @jsx h */
import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import { tw } from "@twind";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { parse } from "https://deno.land/std@0.151.0/encoding/csv.ts";

export default function SqlViewer() {
  const [fileName, setFileName] = useState('');
  const [csvHeader, setCsvHeader] = useState([]);
  const [csvValues, setCsvValues] = useState([]);

  const reader = new FileReader();
  const onInput = useCallback((event: h.JSX.HTMLElement<InputEvent>) => {
    event.preventDefault();
    let file = event.target.files[0];
    reader.readAsText(file);
    setFileName(file.name.substring(0, file.name.lastIndexOf('.csv')) as string);
    reader.onloadend = (async (e) => {
      const csvContent = await parse(reader.result as string);
      console.log(csvContent.slice(0, 1));
      console.log(csvContent.slice(1));
      setCsvHeader(csvContent.slice(0,1));
      setCsvValues(csvContent.slice(1));
    });
  },[reader, setFileName, setCsvHeader, setCsvValues]);

  return (
    <div>
      <div class={tw`flex gap-2 w-full`}>
        <input
          type='file'
          accept='.csv'
          disabled={!IS_BROWSER}
          class={tw`px-2 py-1 border(gray-100 2) hover:bg-gray-200`}
          onInput={onInput}
          />
      </div>
      {(fileName && csvHeader && csvValues) ?
        (
          <div>
            <div>
              insert into {fileName}
            </div>
            <div>
              ({csvHeader.join(",")}) values
            </div>
            <div>
              {csvValues.map((csvValue) => `(${csvValue.join(",")})` ).join(",\n")};
            </div>
          </div>
        ) : null
      }
    </div>
  );
}
