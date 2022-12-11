import ImageService from "~~/src/services/Image.Service";

interface option {
  id: number;
  question_id: number;
  answer: string;
  created_at: string;
  updated_at: string;
}

// Generate image file form url
export const generateFileFromUrl = async (url: string) => {
  let fileName = url?.slice(Math.max(url.indexOf("uploads"), 0), url.length);
  fileName = fileName?.slice(
    Math.max(fileName.indexOf("-") + 1, 0),
    url.length
  );

  const file = fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((response) => {
      return new File([response], fileName);
    });
  return file;
};

// Reformat options as option component's props data formate to use in question edit form
export const reformOption = async (
  options: object[],
  currectAnswer: string
) => {
  // 1) declare an empty array for pushing reformated options
  const reformedOptions = [];

  // 2) iterate through all option object
  options.forEach(async (option: option) => {
    // 3) if option have image value, then generate file from the url otherwise keep as it is
    const optionValue = option?.answer?.includes("http")
      ? await generateFileFromUrl(option?.answer)
      : option?.answer;

    // 4) create option object as desiered fromate and push it to reformatedOption array
    reformedOptions.push({
      value: optionValue,
      checked: false,
      type: option?.answer?.includes("$$")
        ? "math"
        : option?.answer?.includes("http")
        ? "image"
        : "text",
    });
  });

  // 5) extract option value from currect answer
  const optionValue = currectAnswer?.includes("http")
    ? await generateFileFromUrl(currectAnswer)
    : currectAnswer;

  // 6) create currect answer object as desiered fromate
  const currect = {
    value: optionValue,
    checked: true,
    type: currectAnswer?.includes("$$")
      ? "math"
      : currectAnswer?.includes("http")
      ? "image"
      : "text",
  };

  // 7) Push currect to reformatedOption array
  reformedOptions.push(currect);

  // 8) return reformed option array
  return reformedOptions;
};

//  options validator
export const validateOptions = (options) => {
  if (options === null) {
    return "All options are required";
  } else if (options?.length) {
    let checked = false;
    let nullValue = false;

    options.forEach((option) => {
      if (option.value === null) {
        nullValue = true;
      }
      if (option.checked === true) {
        checked = true;
      }
    });

    if (nullValue === true) {
      return "All options are required";
    }

    if (checked === false) {
      return "Currect answer is required";
    }

    // check if have any  duplicate value
    let duplicate = false;
    for (let i = 0; i < options.length; i++) {
      for (let j = 0; j < options.length; j++) {
        if (i !== j) {
          if (
            options[i]?.type !== "image" &&
            options[j]?.type !== "image" &&
            options[i]?.value === options[j]?.value
          ) {
            duplicate = true;
          }
        }
      }
    }

    if (duplicate === true) {
      return "Duplicate option are not allowed";
    }

    return false;
  }
};

// fomrat option and upload image to aws s3 bucket
export const fomratOptionToSubmit = async (options) => {
  // 1) declare optionsImageUploaded variable to track if any image is not uploaded and declare a option value empty array container
  let optionsImageUploaded = true;
  const optionsValue = [];
  let correct_answer;

  // 2) iterate through all options
  for (let i = 0; i < options.length; i++) {
    let value;

    // 3) check if option type is image and upload image if true otherwise keep it as it
    if (options[i].type === "image") {
      const imageUpload = await new ImageService().Upload(options[i].value);

      if (imageUpload.status) {
        value = imageUpload.url;
      } else if (!imageUpload.status) {
        optionsImageUploaded = false;
      }
    } else {
      value = options[i].value;
    }

    // 4) check if option is checked, if true then assign it to correct answer, otherwise push it to option value
    if (options[i].checked) {
      correct_answer = value;
    } else {
      optionsValue.push(value);
    }
  }

  // return false if optionsImageUploaded is false, otherwise return optionValues and correct answer
  if (optionsImageUploaded === false) {
    return false;
  } else {
    return { optionsValue, correct_answer };
  }
};

export const convertTime = (dateTime: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let time = new Date(dateTime);

  return (
    time.getDate() +
    " " +
    months[time.getMonth()] +
    " " +
    time.getFullYear() +
    ", " +
    (time.getHours() % 12) +
    ":" +
    time.getMinutes() +
    " " +
    (time.getHours() / 12 === 0 ? "AM" : "PM")
  );
};
