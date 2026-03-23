import { useApi } from "~/composables/useApi";
import type { SigninInput } from "~/types/input/SigninInput";
import type { SignupInput } from "~/types/input/SignupInput";
import type { UpdateUserInput } from "~/types/input/UpdateUserInput";

export class AuthService {
  static async signup(signupForm: SignupInput) {
    const api = useApi() as any;
    const { data } = await api.post("/auth/signup", signupForm);
    return data;
  }

  static async signin(signinForm: SigninInput) {
    const api = useApi() as any;
    const { data } = await api.post("/auth/signin", signinForm);
    return data;
  }

  static async me() {
    const api = useApi() as any;
    const { data } = await api.get("/auth/me");
    return data;
  }

  static async updateMe(updateForm: UpdateUserInput, profileImage = null) {
    const api = useApi() as any;

    if (profileImage) {
      const uploadResponse = await uploadFile(profileImage, "avatars");
      updateForm.profileImage = uploadResponse.key;
    }

    const { data } = await api.put("/user/me", updateForm);
    return data;
  }
}